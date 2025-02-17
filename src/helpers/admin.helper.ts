import { ICategory, IMenuItem, ApiResponse, ICombo, IUser } from '@/interfaces/Types';
import { getAuthToken } from '@/helpers/cookie.helper';

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCategories = async (): Promise<ApiResponse<ICategory[]>> => {
  const res = await fetch(`${APIURL}categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching categories: ${res.statusText}`);
  }

  const data: ICategory[] = await res.json();
  return { data };
};

export const postMenuItem = async (menuItem: IMenuItem): Promise<ApiResponse<IMenuItem>> => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found");

  const res = await fetch(`${APIURL}menu-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(menuItem),
  });

  if (!res.ok) {
    throw new Error(`Error posting menu item: ${res.statusText}`);
  }

  const data: IMenuItem = await res.json();
  return { data };
};

export const patchMenuItem = async (
  menuItemId: string,
  updatedMenuItem: IMenuItem
): Promise<ApiResponse<IMenuItem>> => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found");

  const res = await fetch(`${APIURL}menu-items/${menuItemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedMenuItem),
  });

  if (!res.ok) {
    throw new Error(`Error updating menu item: ${res.statusText}`);
  }

  const data: IMenuItem = await res.json();
  return { data };
};

export const fetchComboById = async (comboId: string): Promise<ICombo> => {
  const res = await fetch(`${APIURL}combos/${comboId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching combo details: ${res.statusText}`);
  }

  const data: ICombo = await res.json();
  return data;
};

export const updateCombo = async (
  comboId: string,
  comboData: Partial<ICombo>
): Promise<ICombo> => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found");

  const res = await fetch(`${APIURL}combos/${comboId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comboData),
  });

  if (!res.ok) {
    throw new Error(`Error updating combo: ${res.statusText}`);
  }

  const data: ICombo = await res.json();
  return data;
};

export const getAllUsers = async (): Promise<IUser[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found");

  const res = await fetch(`${APIURL}users/findAllUsers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener todos los usuarios");
  }

  const data: { data: IUser[] } = await res.json();
  return data.data;
};

export const desactivateUser = async (email: string): Promise<any> => {
  const token = getAuthToken();
  if (!token) throw new Error("No authentication token found");

  const res = await fetch(`${APIURL}users/desactivate/${email}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
};