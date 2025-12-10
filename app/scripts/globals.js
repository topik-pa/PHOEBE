const STATUS = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error'
}

export function updateStatus(targets, status) {
  if (!(status in STATUS)) {
    throw new Error(`Invalid status: ${status}`)
  }
  targets.forEach((target) => {
    target.classList.remove(...Object.values(STATUS))
    target.classList.add(STATUS[status])
  })
}
