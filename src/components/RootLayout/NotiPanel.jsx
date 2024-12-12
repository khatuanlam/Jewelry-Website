import ThemeContext from '@contexts/ThemeContext'
import { X } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'

export default function Notification({ onClose }) {
    const [isVisible, setIsVisible] = useState(false)
    const { showNotification } = useContext(ThemeContext)
    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div
            className={`w-full bg-white p-4 shadow-md transition-all duration-300 ease-in-out z-50 ${isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-2 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex-1 ">
                        <p className="font-medium text-destructive text-lg">Thông báo</p>
                        <p className="text-md text-gray-500">
                            {showNotification}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close notification"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}

