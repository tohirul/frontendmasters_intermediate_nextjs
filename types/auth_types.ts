export interface RegisterActionResponse {
  errors?: {
    email?: string[]
    password?: string[]
    _form?: string[]
  }
}

export interface LoginActionResponse {
  errors?: {
    email?: string[]
    password?: string[]
    _form?: string[]
  }
}
