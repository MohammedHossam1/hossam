'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'
import { Input } from './ui/input'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  repassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.password === data.repassword, {
  message: "Passwords don't match",
  path: ['repassword'],
})

type FormData = z.infer<typeof schema>

const Validation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    // handle form submission
    console.log(data)
  }

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <Input
          {...register('name')}
          placeholder="Name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Input
          {...register('email')}
          placeholder="Email"
          type="email"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input
          {...register('phone')}
          placeholder="Phone"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>
      <div>
        <Input
          {...register('password')}
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>
      <div>
        <Input
          {...register('repassword')}
          placeholder="Confirm Password"
          type="password"
        />
        {errors.repassword && (
          <p className="text-red-500 text-xs mt-1">{errors.repassword.message}</p>
        )}
      </div>
      <Button type="submit">
        Submit
      </Button>
    </form>
  )
}

export default Validation