import User from "@/model/user"
import { NextRequest, NextResponse } from "next/server"
import { connetToDatabase } from '@/lib/db';


export async function POST(request:NextRequest) {
    try {
        const {email, password} = await request.json()

        if(!email || !password){
            return NextResponse.json({
                error: "Email and Password are required"
            }, {status: 400})
        }

        await connetToDatabase()

        const existUser = await User.findOne({email})
        if(existUser){
            return NextResponse.json(
                {error: "User already register "},
                {status: 400}
            )
        }

        await User.create({
            email, password
        })

        return NextResponse.json(
            {message: "User register successfully "},
            {status: 201}
        )

    } catch (_error) {
        return NextResponse.json(
            {error: "User register Failed"},
            {status: 500}
        )
    }
}