import { fetchUser } from "@/lib/actions/user.actions";

export const GET = async (request: Request) => {
  const id = request.url.split("/").pop();

  const user = id ? await fetchUser(id?.toString()) : null;

  return new Response(JSON.stringify(user));
};
