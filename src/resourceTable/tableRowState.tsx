import { useCallback, useContext, useMemo, useState } from 'react';
import { useTextField } from 'common';
import { randomSuccessOrFailure } from 'common/mockApiCalls';
import { toastContext } from 'common/toast';

export interface ResourceDetails {
  name: string;
  id: string;
  createdOn: Date;
}

export const useResourceTableRow = (initialState?: ResourceDetails) => {
  const { addMessage } = useContext(toastContext)
  const [id, setId] = useState<string | undefined>(initialState?.id)
  const nameField = useTextField(initialState?.name)
  const [createdOn, setCreatedOn] = useState<Date | undefined>(initialState?.createdOn)

  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const isNew = useMemo(() => !id, [id])
  const hasError = useMemo(() => !!errorMessage, [errorMessage])

  const handleSetErrorMessage = useCallback((message?: string) => {
    setErrorMessage(message)
    if (message)
      addMessage({
        level: 'error',
        Title: 'Error',
        message: message
      })
  }, [setErrorMessage, addMessage])

  const handleSave = useCallback(() => {
    if (!nameField.value) {
      const msg = "name field was not set"
      handleSetErrorMessage(msg)
      return Promise.reject(Error(msg))
    }

    return randomSuccessOrFailure({ id, name: nameField.value })
      .catch(() => { throw Error("api save failed for reasons") })
      .then((): ResourceDetails => {
        // simulating result from an api call
        const savedResourceDetails: ResourceDetails = {
          id: id ?? `r${Math.floor(Math.random() * 100000)}`,
          name: nameField.value ?? "",
          createdOn: createdOn ?? new Date()
        }
        setCreatedOn(savedResourceDetails.createdOn)
        setId(savedResourceDetails.id)
        setErrorMessage(undefined)
        return savedResourceDetails
      })
      .catch((msg: Error) => {
        handleSetErrorMessage(msg.message)
        throw msg
      })
  }, [id, nameField, createdOn, handleSetErrorMessage])

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
