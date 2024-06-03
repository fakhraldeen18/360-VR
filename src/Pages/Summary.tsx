import { GlobalContext } from '@/App'
import api from '@/api'
import { TypeOrder, TypeOrderItem } from '@/types/Index'
import { useQuery } from '@tanstack/react-query'
import { CircleCheckIcon } from 'lucide-react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

export default function Summary() {
  const context = useContext(GlobalContext)
  if (!context) throw Error("COntext is missing")
  const { state } = context
  
  const getOrders = async () => {
    try {
      const res = await api.get("/order")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data: orders, error: orderError } = useQuery<TypeOrder[]>({
    queryKey: ["order"],
    queryFn: getOrders
  })
  const getOrderFromUser = orders?.filter((order) => order.userId == state.user?.nameidentifier)

  const getOrderItems = async () => {
    try {
      const res = await api.get("/orderitem")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data: orderItems, error: orderItemsError } = useQuery<TypeOrderItem[]>({
    queryKey: ["orderItem"],
    queryFn: getOrderItems
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  dark:bg-gray-900 px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-md w-full border rounded-lg shadow-lg p-8 md:p-12">
        <div className="flex flex-col items-center justify-center space-y-6">
          <CircleCheckIcon className="text-green-500 h-16 w-16" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-50">
            Thank You!
          </h1>
          <div className="grid gap-2 text-center">
            <p className="text-gray-400">
              Your order has been completed successfully.
            </p>
            {/* <p className="text-gray-400">Order #12345 - Total: $99.99</p> */}
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
            
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
