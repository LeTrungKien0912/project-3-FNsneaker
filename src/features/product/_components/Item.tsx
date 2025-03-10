import { useToast } from "../../../components/ui/use-toast"
import { useState } from "react"
import { useProductMutation } from "@/hooks/useProductMutation"
import { Form, FormControl, FormField, FormItem } from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"

type ProductItemProps = {
    product: any
}

const ProductItem = ({product}: ProductItemProps) => {
    const {toast} = useToast()
    const [productEditId, setProductEditId] = useState(null as number | null)
    const [productEdit, setProductEdit] = useState({} as any)
    const  {form, onSubmit} = useProductMutation({
        action: 'UPDATE',
        onSuccess: () => {
            setProductEditId(null)
            toast({
                variant: 'destructive',
                title: 'Chúc mừng thanh niên!!',
                description: 'Em đã cập nhật sản phẩm thành công'
            })
        }
    })
    const handleClick = (product: any) => {
        setProductEditId(product.id!)
        setProductEdit(product)
        form.reset({
            name: product.name || '',
            price: product.price || 0
        })
    }
    const handleOnSubmit = (values: any) => {
        onSubmit({...productEdit, ...values})
    }
    return(
        <div>
            {productEditId === product.id ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleOnSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='Tên sản phẩm' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name='price'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder='Giá sản phẩm' {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        ></FormField>
                        <button type='submit'>Lưu</button>
                    </form>
                </Form>
            ) : (
                <>
                    {product.name} - {product.price}
                    <button onClick={() => handleClick(product)}>Sửa</button>
                </>
            )}
        </div>
    )
}
export default ProductItem