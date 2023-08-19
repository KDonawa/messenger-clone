export { default } from "next-auth/middleware";

export const config = { matcher: ["/chats/:path*", "/users/:path*"] };

// export const config = { matcher: ["/test"] };
