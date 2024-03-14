import s from './HeaderNotify.module.scss'

export const HeaderNotify = () => {
  return (
    <div className={s.head}>
      <div className={s.leftSide}>
        <div className={s.cover} />
        <span className={s.name}>RSN</span>
      </div>

      <span className={s.time}>1 sec ago</span>
    </div>
  )
}
