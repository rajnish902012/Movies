import {
    Form,
    Input,
    InputNumber,
    Button,
    Modal,
    DatePicker,
    Select,
} from "antd";
import moment from "moment";
import { useEffect } from "react";

const ModalForm = ({
    isModalVisible,
    edit,
    onFinish,
    onFinishFailed,
    config,
    genres,
    handleCancel,
    handleOk,
}) => {
    const [form] = Form.useForm();
    const ratings = [0,1,2,3,4,5,6,7,8,9,10];
    const init =
        edit == null
            ? {
                  genre: "",
                  price: 0,
                  rating: 0,
                  releaseDate: moment(),
                  title: "",
              }
            : edit;
    console.log(edit, init, "djcdj");
    useEffect(() => {
        form.setFieldsValue(init);
    }, [form, init]);
    return (
        <Modal
            title={edit ? "Edit Movie" : "Add Movie"}
            visible={isModalVisible || edit}
            onOk={handleOk}
            footer={null}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                name="add_movie"
                initialValues={init}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Movie Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Title must be between 3-60 characters",
                            min: 3,
                            max: 60,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="genre"
                    label="Genre"
                    rules={[
                        {
                            required: true,
                            // message: "Please enter a decimal value",
                        },
                    ]}
                    style={{
                        display: "inline-block",
                        width: "40%",
                        marginRight: "32px",
                    }}
                >
                    <Select>
                        {genres.map((g) => (
                            <Select.Option value={g}>
                                {g}
                            </Select.Option>
                        ))}
                        {/* <Select.Option value="demo">Demo</Select.Option> */}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="releaseDate"
                    label="Release Date"
                    {...config}
                    style={{
                        display: "inline-block",
                        width: "50%",
                    }}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    label="Rating"
                    name="rating"
                    style={{
                        display: "inline-block",
                        // width: "calc(50% - 8px)",
                        marginRight: "16px",
                    }}
                >
                    <Select>
                        {ratings.map((g) => (
                            <Select.Option value={g}>
                                {g}
                            </Select.Option>
                        ))}
                        {/* <Select.Option value="demo">Demo</Select.Option> */}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    style={{
                        display: "inline-block",
                        // width: "calc(50% - 8px)",
                    }}
                >
                <input
                    type="text"
                    pattern="[0-9.]*"
                    value="0"
                />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalForm;
