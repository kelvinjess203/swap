import React from 'react'
import MulticallUpdater from 'state/multicall/updater'
import TransactionUpdater from 'state/transactions/updater'

export function Updaters() {
  return (
    <>
      {/* <ListsUpdater /> */}
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}

export default React.memo(Updaters)
