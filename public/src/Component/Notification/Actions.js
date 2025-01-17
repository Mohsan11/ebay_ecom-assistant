// actions.js
export const showNotification = (notificationType) => ({
  type: "SHOW_NOTIFICATION",
  payload: { notificationType },
});

export const hideNotification = () => ({
  type: "HIDE_NOTIFICATION",
});
