export function openFullscreen(): Promise<void> {
  const body: HTMLBodyElement = document.querySelector(
    "body"
  ) as HTMLBodyElement;
  if (body.requestFullscreen) {
    return body.requestFullscreen();
  }
  return Promise.reject(Error("Not supported"));
}

export function exitFullScreen(): Promise<void> {
  return document.exitFullscreen();
}
