 

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error'
}

export function updateStatus(targets, status) {
  targets.forEach((target) => {
    target.classList.remove(...Object.values(STATUS))
    target.classList.add(STATUS[status])
  })
}
