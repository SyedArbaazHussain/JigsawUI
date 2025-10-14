import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/Card'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/Button'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="items-center w-xs">
      <Card variant="primary" color="blue">
        <CardTitle>Title</CardTitle>
        <CardHeader>Header1</CardHeader>
        <CardDescription>Card Description 1</CardDescription>
        <CardDescription>Card Description 2</CardDescription>
        <CardFooter>Card Footer</CardFooter>
      </Card>
      <Button variant="secondary" color="orange" shape="squircle">
        CLICK ME
      </Button>
    </div>
  )
}
