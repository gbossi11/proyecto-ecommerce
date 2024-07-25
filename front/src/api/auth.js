export const login = async (email, password) => {
  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);
  } else {
    throw new Error(data.error);
  }
};

export const getProductos = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8080/productos", {
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching productos");
  }

  return await response.json();
};
