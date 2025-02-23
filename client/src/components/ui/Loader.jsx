import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ isLoading }) {  // Passo isLoading come prop, e se è true mostra il componente nel return
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed top-0 left-0 w-screen h-screen bg-black opacity-20 flex justify-center items-center"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="ease-linear rounded-full border-4 border-t-8 border-blue-400 h-24 w-24"
                    >
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}