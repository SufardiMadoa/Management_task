import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import * as React from "react"



export function NotFound() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
    <Card className="w-[350px] flex justify-center items-center">
      <CardHeader>
        <CardTitle>404 Not Found.</CardTitle>
        <CardDescription>Sorry, the page you are looking for does not exist.</CardDescription>
      </CardHeader>
    </Card>
  </div>
  )
}
