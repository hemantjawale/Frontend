import React,{useId} from "react";

function Select({
    label,
    options,
    className,
    ref,
    ...props
})
{

    const id = useId()
return (

<>
<div className="w-full">
{label && <label htmlFor={id} className=""></label>}

</div>
</>
  )
}

export default Select