import { headers } from "next/headers";
import { cookies } from "next/headers";

export async function GET(req: Request, res: Response) {
  try {
    let headersList = headers();

    let address = headersList.get("address");
    const ans = await fetch(`http://localhost:3001/nonce?address=${address}`);
    const data = await ans.json();

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error });
  }
}

export async function POST(req: Request, res: Response) {
  try {
    let headersList = headers();
    //console.log("from the server",headersList)
    let authorization = headersList.get("authorization");
    let signature = headersList.get("signature");
    let req2header = {
      authorization: `${authorization}`,
      signature: `${signature}`,
    };
    console.log(req2header);
    const ans = await fetch(`http://localhost:3001/verify`, {
      method: "POST",
      headers: req2header,
    });
    let cookies1 = ans.headers.getSetCookie();
    let jwt = cookies1[0].split(";")[0].split("=");
    console.log(jwt);

    const data = await ans.json();
    console.log("data ", data);
    cookies().set({
      name: jwt[0],
      value: jwt[1],
      httpOnly: true,
      path: "/",
    });
    if (authorization == data.authHeader && signature == data.signature) {
      return Response.json({ status: 200 });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    Response.json({ err });
  }
}
