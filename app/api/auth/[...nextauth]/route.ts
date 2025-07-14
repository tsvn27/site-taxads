import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

const ADMIN_DISCORD_IDS = process.env.ADMIN_DISCORD_IDS?.split(",") || []

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify email",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        console.log("JWT Callback - Full user object:", JSON.stringify(user, null, 2))
        
        token.accessToken = account.access_token
        token.id = user.id
        token.name = user.username || user.name || user.global_name || "Usuário Discord"
        
        if (user.image) {
          token.image = user.image
        } else if (user.avatar) {
          const extension = user.avatar.startsWith('a_') ? 'gif' : 'png'
          token.image = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${extension}`
        } else {
          const defaultAvatarIndex = user.discriminator === '0' || !user.discriminator
            ? (BigInt(user.id) >> 22n) % 6n
            : Number.parseInt(user.discriminator) % 5
          token.image = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`
        }
        
        console.log("Final token:", {
          id: token.id,
          name: token.name,
          image: token.image
        })
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        name: token.name as string,
        image: token.image as string,
        isAdmin: ADMIN_DISCORD_IDS.includes(token.id as string),
      }
      
      console.log("Session callback - Final session:", {
        id: session.user.id,
        name: session.user.name,
        image: session.user.image,
        isAdmin: session.user.isAdmin
      })
      
      return session
    },
    async signIn({ user, account, profile }) {
      console.log("SignIn callback - user allowed")
      return true
    },
  },
  pages: {
    signIn: "/",
    error: "/", 
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
})

export { handler as GET, handler as POST }