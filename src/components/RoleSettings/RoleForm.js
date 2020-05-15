import React from 'react'
import { useForm } from 'react-hook-form'

const RoleForm = ({role, updateRole}) => {
    const { register, handleSubmit, watch, errors } = useForm()

    return (
        <div className='flex'>
            <form onSubmit={handleSubmit(updateRole)}>
                <label className=''>
                    Name:
                    <input name="name" defaultValue={role.name} ref={register({ required: true })} />
                    {errors.name && <span>This field is required</span>}
                </label>
                <label className='mx-2'>
                    Color:
                    <input type='color' name="color" defaultValue={role.color} ref={register} />
                </label>
                <input className='mx-2' type='hidden' name="id" defaultValue={role.id} ref={register} />
                <input className='mx-2 border border-border-gray p-1' type="submit" />
            </form>
        </div>
    )
}

export default RoleForm
