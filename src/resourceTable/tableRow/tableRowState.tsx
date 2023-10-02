import { useCallback, useMemo, useState } from 'react';
import { useTextField } from 'common';
import { randomSuccessOrFailure } from 'common/mockApiCalls';

export interface ResourceDetails {
  name: string;
  id: string;
  createdOn: Date;
}

export const useResourceTableRow = (initialState?: ResourceDetails) => {
  const [id, setId] = useState<string | undefined>(initialState?.id)
  const nameField = useTextField(initialState?.name)
  const [createdOn, setCreatedOn] = useState<Date | undefined>(initialState?.createdOn)

  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const isNew = useMemo(() => !id, [id])
  const hasError = useMemo(() => !!errorMessage, [errorMessage])

  const handleSave = useCallback(() => {
    return randomSuccessOrFailure({ id, name: nameField.value })
      .catch(() => { throw Error("api save failed for reasons") })
      .then((): ResourceDetails => {
        // simulating result from an api call
        if (!nameField.value) {
          const msg = "name field was not set"
          setErrorMessage(msg)
          throw msg
        }

        const savedResourceDetails: ResourceDetails = {
          id: id ?? Math.floor(Math.random() * 100000).toString(),
          name: nameField.value,
          createdOn: createdOn ?? new Date()
        }
        setCreatedOn(savedResourceDetails.createdOn)
        setId(savedResourceDetails.id)
        setErrorMessage(undefined)
        return savedResourceDetails
      })
      .catch((msg: Error) => {
        setErrorMessage(msg.message)
        throw msg
      })
  }, [id, nameField.value, createdOn])

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
