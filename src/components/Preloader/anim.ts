import { animate, delay } from "framer-motion"

export const opacity = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 0.75,
        transition: {duration: 0.7, delay: 0.4}
    },
}

export const slideUp = {
    initial: {
        y: 0
    },
    exit: {
        y: "-100vh",
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2}
    }
}

export const slidefromDown = {
    initial: {
        y: "75vh"
    },
    animate: {
        y: 0,
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]}
    },
    exit: {
        y: "-100vh",
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2}
    }
}