export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      username: payload.sub,
      role: payload.role // 'ADMIN' or 'TEACHER' (depending on DB, but likely without ROLE_ prefix in token)
    };
  } catch (e) {
    return null;
  }
};

export const isAdmin = () => {
  const user = getUserFromToken();
  return user?.role === 'ADMIN' || user?.role === 'ROLE_ADMIN';
};

export const isTeacher = () => {
  const user = getUserFromToken();
  return user?.role === 'TEACHER' || user?.role === 'ROLE_TEACHER';
};
