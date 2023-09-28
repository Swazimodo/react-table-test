import { useTextField } from 'common';
import { randomSuccessOrFailure } from 'common/mockApiCalls';
import react, { useCallback, useMemo, useState } from 'react';

export interface ResourceDetails {
  name: string;
  id: string;
  createdOn: Date;
}

export const useResourceTableRow = (initialState?: ResourceDetails) => {
  const [id, setId] = useState<string | undefined>(initialState?.id)
  const nameField = useTextField(initialState?.name)
  const [createdOn, setCreatedOn] = useState<Date | undefined>()

  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const isNew = useMemo(() => !!id, [id])
  const hasError = useMemo(() => !!errorMessage, [errorMessage])

  const handleSave = useCallback(() => {
    randomSuccessOrFailure({ id, name: nameField.value })
      .catch(() => setErrorMessage('Could not create for reasons'))
      .then(() => {
        if (isNew)
          setCreatedOn(new Date())
        setId(Math.floor(Math.random() * 100000).toString())
      })
  }, [id, nameField.value])

  const handleDelete = useCallback(() => {
    randomSuccessOrFailure(id)
      .catch(() => setErrorMessage('Could not delete for reasons'))
      .then()
  }, [id])

  return {
    id,
    nameField,
    createdOn,
    errorMessage,
    isNew,
    hasError,
    handleSave,
    handleDelete
  }
}

export const useResourceTableState = () => {
  const rows = useState()

  return {}
}
