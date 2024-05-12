import { IComment } from "@/types/request.interface"
import formatDate from "@/utils/formatDate"

const Comments = ({...comment}: IComment) => {
  return (
    <>
      <div className="p-5 rounded border border-primary">
        <p>{comment.text}</p>
        <div className="flex justify-between mt-2">
           <p>{comment.user.name} {comment.user.surname}</p>
           <p>{formatDate(comment.createdAt)}</p>
        </div>
      </div>
    </>
  )
}

export default Comments