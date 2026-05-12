import { Form } from '@inertiajs/react';
import { Button, Form as AntdForm, Input, Modal } from 'antd';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { store } from '@/routes/teams';

export default function CreateTeamModal({ children }: PropsWithChildren) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <span onClick={() => setOpen(true)}>{children}</span>
            <Modal
                title="Create a new team"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                destroyOnClose
            >
                <Form
                    key={String(open)}
                    {...store.form()}
                    onSuccess={() => setOpen(false)}
                >
                    {({ errors, processing }) => (
                        <AntdForm layout="vertical" className="mt-4">
                            <AntdForm.Item
                                label="Team name"
                                validateStatus={errors.name ? 'error' : ''}
                                help={errors.name}
                                required
                            >
                                <Input
                                    id="name"
                                    name="name"
                                    data-test="create-team-name"
                                    placeholder="My team"
                                    size="large"
                                />
                            </AntdForm.Item>

                            <div className="mt-8 flex justify-end gap-2">
                                <Button onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    data-test="create-team-submit"
                                    loading={processing}
                                >
                                    Create team
                                </Button>
                            </div>
                        </AntdForm>
                    )}
                </Form>
            </Modal>
        </>
    );
}
