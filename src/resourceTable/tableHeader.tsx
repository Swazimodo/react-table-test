import { useMediaQuery, MediaSizes, useClosestMedia } from "common/mediaHooks"
import { FC } from "react"

type SortColumn = 'title' | 'id' | 'createdOn'
type SortDirection = 'asc' | 'desc'

interface TableHeaderProps {
  sortColumn: SortColumn
  sortDirection: SortDirection
  onSortChange: (sortColumn: SortColumn, sortDirection: SortDirection) => void
}

export const TableHeader: FC<TableHeaderProps> = (props) => {
  const closest = useClosestMedia();
  const query = useMediaQuery(MediaSizes.lg);
  return <div>
    closest: {closest}
    {query && <div>It's lg</div>}
  </div>
}
