import findUserByEmail from "@services/page";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
export default NextAuth({
    providers: [
        Providers.Credentails({
            async authorize(credentials) {
                const user = await findUserByEmail(credentials.email)


            }
        })
    ]
})