import React, { FC, useState } from 'react';
import { ConfirmationModal } from 'common/confirmation'
import { useResourceTableRow } from 'resourceTable/tableRowState'

export const ResourceTableRow: FC = () => {
  const row = useResourceTableRow()

  return <div>
    table row
  </div>
}
