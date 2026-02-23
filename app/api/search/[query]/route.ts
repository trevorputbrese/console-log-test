import { NextResponse } from "next/server";

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Viewer" },
  { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Editor" },
  { id: 5, name: "Eve Torres", email: "eve@example.com", role: "Admin" },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ query: string }> }
) {
  const { query } = await params;

  console.log('hello-world');
  console.log(`[API] Search request received — query: "${query}", timestamp: ${new Date().toISOString()}`);

  // Read credhub-test credentials from VCAP_SERVICES
  const vcapRaw = process.env.VCAP_SERVICES;
  if (vcapRaw) {
    const vcap = JSON.parse(vcapRaw);
    const credhubEntries = vcap["credhub"] || vcap["credhub-test"] || [];
    const service = credhubEntries.find(
      (s: { name: string }) => s.name === "credhub-test"
    );
    if (service) {
      console.log("[CREDHUB] credhub-test credentials:", JSON.stringify(service.credentials, null, 2));
    } else {
      console.log("[CREDHUB] credhub-test service not found in VCAP_SERVICES");
    }
  } else {
    console.log("[CREDHUB] VCAP_SERVICES is not set — app may not be running on Cloud Foundry");
  }
  
  const lowerQuery = query.toLowerCase();

  const results = users.filter(
    (user) =>
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.role.toLowerCase().includes(lowerQuery)
  );

  return NextResponse.json(results);
}
