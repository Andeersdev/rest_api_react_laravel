
type ErrorAlertProps = {
    message: string
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
    return (
        <div className='bg-red-500 text-white rounded p-2 m-3'>
            {message}
        </div>
    )
}
