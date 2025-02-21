import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carosel'
import ProductItem from '@/features/product/_components/product-item2'
import { cn } from '@/lib/utils'
import { getAllNewProduct } from '@/services/product/request'
import { IFNewOutStand } from '@/services/product/types'
import { EyeIcon, ShoppingCartIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import ListCategory from './ListCategory'
import { getAllCategory } from '@/services/category/requests'
import instance from '@/core/api'
import { Link } from 'react-router-dom'
import { Rate } from 'antd'
import NewsList from './NewsList'

const HomePage = () => {
    const [activeTab, setActiveTab] = useState(0)
    const [productCate, setProductCate] = useState([])
    const [category, setCategory] = useState<any>([])
    const [outStProducts, setOutStProducts] = useState([])

    const tabs = ['sản phẩm nổi bật']

    const { data: newProducts } = useQuery({
        queryFn: () => getAllNewProduct(),
        queryKey: '/product-new;'
    })
    useEffect(() => {
        getAllCategory().then((data) => {
            setCategory(data)
            instance.get(`/api/infoProduct?category=${data[0]._id}&limit=12`).then(({ data }) => {
                setProductCate(data.data)
            })
        })
        // instance.get("api/order/product-best-seller?startDate=2024-06-01&endDate=2024-12-30").then(({ data }) => {
        //     setOutStProducts(data.data);
        // })
        instance
            .get('api/order/product-best-seller?startDate=2024-06-01&endDate=2024-12-30')
            .then(({ data }) => {
                const top12Products = data.data.slice(0, 12)
                setOutStProducts(top12Products)
            })
            .catch((error) => {
                console.error('Error fetching top-selling products:', error)
            })
    }, [])

    const handgetProduct = async (id: string) => {
        const { data } = await instance.get(`/api/infoProduct?category=${id}&limit=12`)
        setProductCate(data.data)
    }
    const formatCurrency = (amount: number | bigint) => {
        // Định dạng số thành tiền Việt Nam
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0, // Tối thiểu số lẻ là 0
        });

        return formatter.format(amount);
    };
    return (
        <main className=''>
            <div className='app-container mt-2 border-2 border-grey-50 shadow-md shadow-grey-40 p-4'>
                <div>
                    <Carousel opts={{ loop: true, duration: 10 }}>
                        <CarouselContent className=''>
                            <CarouselItem className=''>
                                <img src='/slide1.jpeg' alt='Slider' />
                            </CarouselItem>
                            <CarouselItem className=''>
                                <img src='/slide2.jpeg' alt='Slider' />
                            </CarouselItem>
                            <CarouselItem className=''>
                                <img src='/slide3.webp' alt='Slider' />
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className='absolute top-1/2 left-4  -translate-y-1/2 z-10' />
                        <CarouselNext className='absolute top-1/2 right-4  -translate-y-1/2 z-10' />
                    </Carousel>
                </div>
            </div>
            <div className='app-container border-black border-t-2 border-b-2 mt-4 mb-4'>
            <ListCategory data={productCate} category={category} handgetProduct={handgetProduct} />
            </div>
            <div className='bg-pink-50 app-container border-2 border-grey-50 shadow-md'>
                <div className='app-container bg-pink-50 relative'>
                    <div className='py-16 px-2'>
                        <h1 className='text-4xl font-bold text-neutral-700 relative mb-10 px-5'>SẢN PHẨM MỚI</h1>
                        <div className='mt-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5'>
                            {newProducts?.map((product, index) => {
                                const variant = product.sizes?.[0]
                                return (
                                    <ProductItem
                                        key={index}
                                        product={product}
                                        {...variant}
                                        detailID={product.productDetails[0]?.productDetailId}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className='app-container'>
                <div className=' py-16 px-2 border-black border-t-2 border-b-2 mb-4 mt-4 shadow-md'>
                    <div>
                        <ul className='flex justify-center gap-8 '>
                            {tabs.map((tab, index) => (
                                <li
                                    className={cn(
                                        'relative text-3xl text-neutral-400 hover:text-neutral-800 transition-all duration-500 after:absolute after:content-[""] after:left-0 after:right-full after:-bottom-1 after:h-[6px] after:bg-neutral-800 hover:after:right-0 after:transition-all cursor-pointer whitespace-nowrap uppercase',
                                        activeTab == index ? 'text-neutral-800 after:right-0' : ''
                                    )}
                                    key={tab}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {tab}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='mt-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5'>
                        {outStProducts.length > 0 &&
                            outStProducts.map((itemOutStProducts: IFNewOutStand) => {
                                return (
                                    <Link
                                        to={`/products/${itemOutStProducts.productId}`}
                                        className='cursor-pointer group'
                                        onClick={() => {
                                            setTimeout(() => {
                                                location.reload()
                                            }, 200)
                                        }}
                                    >
                                        <div className='pt-6 relative pb-3 overflow-hidden'>
                                            <div className='relative rounded-md overflow-hidden'>
                                                <img
                                                    src={
                                                        itemOutStProducts.image ||
                                                        'https://product.hstatic.net/200000690551/product/mule_outfit3_ad305b65207844f38ea799b8e69b0d24_large.png'
                                                    }
                                                    alt=''
                                                    className='h-[240px] w-full top-0 left-0 right-0 bottom-0 object-cover opacity-98 group-hover:opacity-100 duration-500  transition-all'
                                                />
                                            </div>
                                            {/* Another image show opacity when hover */}
                                            <div className='absolute group-hover:bottom-4 transition-all group-hover:opacity-100 opacity-0 duration-500 -bottom-4 left-0 right-0 flex justify-center items-center gap-2 px-2'>
                                                <button
                                                    className='w-10 h-10 flex items-center justify-center text-neutral-950 bg-white hover:bg-neutral-950 hover:text-white outline-none hover:opacity-90 transition-all rounded-md text-sm leading-none flex-1'
                                                    title='Xem nhanh'
                                                >
                                                    <ShoppingCartIcon className='size-3 mr-2 text-xs' />
                                                    Thêm vào giỏ
                                                </button>
                                                <button
                                                    className='w-10 h-10 flex items-center justify-center border border-neutral-800 text-white bg-neutral-800 outline-none hover:opacity-90 transition-all rounded-md text-sm leading-none'
                                                    title='Xem nhanh'
                                                >
                                                    <EyeIcon></EyeIcon>
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <Rate
                                                className='my-1'
                                                disabled
                                                value={Number.parseInt(itemOutStProducts?.averageRating)}
                                            />
                                            <p className='text-md my-1'>{itemOutStProducts.productName}</p>
                                            <div className='flex items-center gap-1'>
                                                <span className='text-red-500 text-sm'>
                                                    {formatCurrency(itemOutStProducts.promotionalPrice)}
                                                </span>
                                                <span className='text-neutral-300 text-xs line-through'>
                                                    {formatCurrency(itemOutStProducts.price)}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                    </div>
                </div>
                <div className='#a'>
                <NewsList/>
                </div>
                <div className='py-16 px-2 grid lg:grid-cols-4 md:grid-cols-2 gap-4 border-t-2 border-black mt-2'>
                    <div className='flex justify-center items-start gap-3'>
                        <img
                            src='https://theme.hstatic.net/200000690551/1001033677/14/home_policy_icon_1.png?v=292'
                            alt=''
                            className='block w-14'
                        />
                        <div className='flex-1'>
                            <p className='mb-1'>Miễn phí vận chuyển</p>
                            <p className='text-sm'>Miễn phí vận chuyển cho tất cả đơn hàng từ 1000k</p>
                        </div>
                    </div>
                    <div className='flex justify-center items-start gap-3'>
                        <img
                            src='https://theme.hstatic.net/200000690551/1001033677/14/home_policy_icon_2.png?v=292'
                            alt=''
                            className='block w-14'
                        />
                        <div className='flex-1'>
                            <p className='mb-1'>Đổi dễ dàng</p>
                            <p className='text-sm'>Đổi hàng sau 30 ngày nếu không hài lòng</p>
                        </div>
                    </div>
                    <div className='flex justify-center items-start gap-3'>
                        <img
                            src='https://theme.hstatic.net/200000690551/1001033677/14/home_policy_icon_3.png?v=292'
                            alt=''
                            className='block w-14'
                        />
                        <div className='flex-1'>
                            <p className='mb-1'>Hỗ trợ</p>
                            <p className='text-sm'>Gọi hotline 0377 485 926 để được tư vấn</p>
                        </div>
                    </div>
                    <div className='flex justify-center items-start gap-3'>
                        <img
                            src='https://theme.hstatic.net/200000690551/1001033677/14/home_policy_icon_4.png?v=292'
                            alt=''
                            className='block w-14'
                        />
                        <div className='flex-1'>
                            <p className='mb-1'>Thanh toán đa dạng</p>
                            <p className='text-sm'>Nhiều phương thức thanh toán đa dạng như: Tiền Mặt, Chuyển Khoản</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export const HomePageButton = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    return (
        <button
            className={cn(
                'w-full max-w-[400px] mx-auto text-black bg-white rounded-md border border-black py-3 px-8 hover:text-white hover:bg-black transition-all duration-500 block',
                className
            )}
        >
            {children}
        </button>
    )
}
export default HomePage