'use server'
import { cookies } from 'next/headers'
import { signin, signup } from '@/utils/authTools'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '@/utils/constants'
import { LoginActionResponse, RegisterActionResponse } from '@/types/auth_types'

const auth_schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6),
})

export const register_action = async (
  prevState: RegisterActionResponse,
  formData: FormData
): Promise<RegisterActionResponse> => {
  const validation = auth_schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!validation.success) {
    return {
      errors: {
        ...validation.error.flatten().fieldErrors,
        _form: ['Something went wrong!', 'Please try again.'],
      },
    }
  }
  const { email, password } = validation.data

  try {
    const { token } = await signup({ email, password })
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, token)
  } catch (error) {
    if (error instanceof globalThis.Error) {
      return {
        errors: {
          _form: [error.message || 'Something went wrong!'],
        },
      }
    }
    return {
      errors: {
        _form: ['An unexpected error occurred.', 'Please try again.'],
      },
    }
  }
  redirect('/dashboard')
}

export const login_action = async (
  prevState: LoginActionResponse,
  formData: FormData
): Promise<LoginActionResponse> => {
  const validation = auth_schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (!validation.success)
    return {
      errors: {
        ...validation.error.flatten().fieldErrors,
        _form: ['Something went wrong!', 'Please try again.'],
      },
    }
  const { email, password } = validation.data
  try {
    const { token } = await signin({ email, password })
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, token)
  } catch (error) {
    if (error instanceof globalThis.Error) {
      return {
        errors: {
          _form: [error.message || 'Something went wrong!'],
        },
      }
    }
    return {
      errors: {
        _form: ['An unexpected error occurred.', 'Please try again.'],
      },
    }
  }
  redirect('/dashboard')
}
