import { sendEmail } from "@/lib/sendEmail";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const body = await req.json();
        const {to, subject, message} = body;
        if (!to || !subject || !message) {
            return NextResponse.json({error:'Missing required field: to, subject, message'}, {status:400})
        }

        const result = await sendEmail(to, subject, `<p>${message}</p>`);

        if(result.success) {
            return NextResponse.json({message:'Email send successfully', data: result.data}, {status: 200})
        } else {
            return NextResponse.json({error:'Failed to send email', details: result.error}, {status: 500})
        }
    } catch (error) {
        console.error('Unexpected error in email API:', error);
        return NextResponse.json({error:'Internal Server Error.'},{status:500})
        
    }
}