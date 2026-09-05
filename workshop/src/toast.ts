// Shared "copied!" confirmation for the workshop views. The element lives in
// index.html as a polite live region; this only toggles its visibility.
export function showToast(message: string) {
  const toast = document.getElementById('ws-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.setAttribute('data-visible', 'true');
  setTimeout(() => {
    toast.setAttribute('data-visible', 'false');
  }, 2000);
}
