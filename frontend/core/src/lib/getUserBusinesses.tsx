//get user's businesses(as the owner or as the personnel)
export async function getUserBusinesses(userId: number) {
  const res = await fetch(
    `http://127.0.0.1:8000/accounts/user/${userId}/businesses`
  );
  return res.json();
}
