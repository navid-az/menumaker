//get user's places(cafes/restaurants)
export async function getUserPlaces(userId: number) {
  const res = await fetch(
    `http://127.0.0.1:8000/accounts/user/${userId}/places`
  );
  return res.json();
}
