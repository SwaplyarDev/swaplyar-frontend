export const getAllUsers = async (token: string) => {
  return fetch('http://localhost:8080/api/v1/users/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
};

export const getUserById = async (token: string, id: string) => {
  return fetch(`http://localhost:8080/api/v1/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching user:', error);
    });
};
