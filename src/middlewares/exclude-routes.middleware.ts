import { Request, Response, NextFunction, RequestHandler } from 'express'

export const excludeRoutes = (middleware: RequestHandler, excludedPaths: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const path = req.path
		const isExcluded = excludedPaths.some((excludedPath) => path.startsWith(excludedPath))

		if (isExcluded) {
			return next()
		} else {
			return middleware(req, res, next)
		}
	}
}