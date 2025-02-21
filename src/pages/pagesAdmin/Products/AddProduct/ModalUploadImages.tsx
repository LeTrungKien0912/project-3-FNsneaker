import { Modal, Typography } from 'antd'

import UploadImage from '@/components/ui/upload-image'
import { useState } from 'react'

export interface ModalUploadImagesProps {
    productId: string
    onOk: (data: any[]) => void
    open: boolean
}

const ModalUploadImages: React.FC<ModalUploadImagesProps> = (props) => {
    const { productId, onOk, open } = props
    const [thumb, setThumb] = useState<string>()
    const [galleries, setGalleries] = useState<string[]>([])

    const handleOk = () => {
        if (!thumb || galleries.length == 0) {
            alert('Vui lòng chọn ảnh')
        } else {
            const thumbData: any[] = [
                {
                    image: thumb,
                    productId: productId,
                    type: 'thumbnail'
                }
            ]

            const galleryData: any[] = galleries.map((e) => {
                return {
                    image: e,
                    productId: productId,
                    type: 'gallery'
                }
            })

            const data = [...thumbData, ...galleryData]

            onOk?.(data)
        }
    }

    return (
        <>
            <Modal
                title='Hình ảnh sản phẩm'
                centered
                open={open}
                closable={false}
                width={1000}
                onOk={handleOk}
                okText='Upload'
                okButtonProps={{ type: 'default' }}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Typography>Thumbnail</Typography>
                <br />
                <UploadImage
                    onChange={(img) => {
                        setThumb(img as any)
                    }}
                />
                <br />
                <Typography>Galleries</Typography>
                <br />
                <UploadImage
                    multiple={true}
                    onChange={(imgs) => {
                        setGalleries(imgs as string[])
                    }}
                />
            </Modal>
        </>
    )
}

export default ModalUploadImages
