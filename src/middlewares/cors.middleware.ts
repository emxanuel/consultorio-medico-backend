import cors from 'cors'

const whiteList: string[] = [
  'https://consultorio-medico-git-dev-emxanuels-projects.vercel.app'
]

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true)
    }
    else if (origin.includes('localhost')) {
      return callback(null, true)
    }
    else if (whiteList.indexOf(origin) !== -1) {
      return callback(null, true)
    }
    else {
      return callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})