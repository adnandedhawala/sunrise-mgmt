import Head from "next/head"
import { useEffect, useState } from "react";
import { Button, Card, Col, Empty, Layout, Row, message } from "antd";
import { getAuthToken } from "../../utils/authUtils";
import { logout, verifyUser } from "../../services/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import { getRecieptById } from "../../services/accounts";
import moment from "moment";
const { Content } = Layout;

const Reciept = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [recieptDetails, setRecieptDetails] = useState(null);
    const router = useRouter();

    const { recieptId } = router.query

    useEffect(() => {
        const user = getAuthToken();
        if (!user) {
            message.error("User acess denied!");
            logout();
            router.push("/");
        } else {
            verifyUser(user).then((response) => {
                setUserDetails(response.data)
            }).catch(() => {
                message.error("User Acess expired!")
                logout();
                router.push("/");
            })
        }
    }, [])

    useEffect(() => {
        if (!!recieptId) {
            getRecieptById(recieptId).then(response => {
                setRecieptDetails(response.data)
            }).catch(() => {
                setRecieptDetails({})
            })
        }
    }, [recieptId])

    const goBack = () => {
        router.back();
    }

    return (
        <Layout>
            <Head>
                <title>Sunrise MGMT</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Content className="p-2">
                <div className="flex flex-col w-full md:max-w-md md:mx-auto">

                    <Button onClick={goBack} type="link" className="mb-8 text-lg text-left text-[#555555]"><ArrowLeftOutlined /> Go Back</Button>
                    {
                        !!recieptDetails ?
                            Object.keys(recieptDetails).length === 0 ?
                                <Empty /> :
                                <Card>
                                    <div className="flex flex-col pb-6">
                                        <div className='flex justify-center'>
                                            <Image width={200} height={200} src="/logo.png" alt="logo" />
                                        </div>
                                        <h1 className="text-center text-2xl mb-6">Payment Reciept</h1>
                                        <Row gutter={[16, 16]}>
                                            <Col xs={12} >
                                                <Row>
                                                    <Col xs={24} className="text-lg">
                                                        <span className="mr-2">Reciept No :</span>
                                                    </Col>
                                                    <Col xs={24} className="text-lg">
                                                        <span className="font-bold text-black">{recieptDetails["Reciept Id"] || "-"}</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} >
                                                <Row>
                                                    <Col xs={24} className="text-lg">
                                                        <span className="mr-2">Date : </span>
                                                    </Col>
                                                    <Col xs={24} className="text-lg">
                                                        <span className="font-bold text-black">{moment(recieptDetails.Date).format("DD-MM-YYYY") || "-"}</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={24} >
                                                <Row>
                                                    <Col xs={24} className="text-lg">
                                                        <span className="mr-2">Name : </span>
                                                    </Col>
                                                    <Col xs={24} className="text-lg">
                                                        <span className="font-bold text-black">{userDetails?.Name || "-"}</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} >
                                                <Row>
                                                    <Col xs={24} className="text-lg">
                                                        <span className="mr-2">Amount : </span>
                                                    </Col>
                                                    <Col xs={24} className="text-lg">
                                                        <span className="font-bold text-black">{"₹" + recieptDetails["Amount"] || "-"}</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} >
                                                <Row>
                                                    <Col xs={24} className="text-lg">
                                                        <span className="mr-2">Payment Mode : </span>
                                                    </Col>
                                                    <Col xs={24} className="text-lg">
                                                        <span className="font-bold text-black">{recieptDetails["Payment Mode"] || "-"}</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} >
                                                <Row>
                                                    <Col xs={24} className="text-lg">
                                                        <span className="mr-2">Purpose : </span>
                                                    </Col>
                                                    <Col xs={24} className="text-lg">
                                                        <span className="font-bold text-black">{recieptDetails["Title"]|| "-"}</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={24} >
                                                <Row>
                                                    <Col xs={24} className="text-lg">
                                                        <span className="mr-2">Recieved By : </span>
                                                    </Col>
                                                    <Col xs={24} className="text-normal">
                                                        <span className=" text-black">{recieptDetails["Recieved By Name"] || "-"}</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </Card> :
                            null
                    }

                </div>
            </Content>

        </Layout>
    )
}

export default Reciept