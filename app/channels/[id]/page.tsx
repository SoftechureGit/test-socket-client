import ChannelClient from "./ChannelClient";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export default function ChannelPage({ params }: { params: { id: string } }) {
  const token = cookies().get("access_token")?.value;

  if (!token) return redirect("/login");

  try {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
  } catch {
    return redirect("/login");
  }

  return <ChannelClient channelId={params.id} />;
}
