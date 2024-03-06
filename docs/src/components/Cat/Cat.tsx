import s from './Cat.module.scss'

export const Cat = () => {
  return (
    <div className={s.cat}>
      <span className={`${s.eyes} ${s.left}`}></span>
      <span className={`${s.eyes} ${s.right}`}></span>
      <span className={s.mouth}></span>
    </div>
  )
}
