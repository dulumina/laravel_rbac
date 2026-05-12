import { Form } from '@inertiajs/react';
import { Button, Form as AntdForm, Input, Modal, Select } from 'antd';
import { useState } from 'react';
import { store as storeInvitation } from '@/routes/teams/invitations';
import type { RoleOption, Team } from '@/types';

type Props = {
    team: Team;
    availableRoles: RoleOption[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export default function InviteMemberModal({
    team,
    availableRoles,
    open,
    onOpenChange,
}: Props) {
    const [inviteRole, setInviteRole] = useState<RoleOption['value']>('member');

    const handleOpenChange = (nextOpen: boolean) => {
        onOpenChange(nextOpen);

        if (!nextOpen) {
            setInviteRole('member');
        }
    };

    return (
        <Modal
            title="Invite a team member"
            open={open}
            onCancel={() => handleOpenChange(false)}
            footer={null}
            destroyOnClose
        >
            <Form
                key={String(open)}
                {...storeInvitation.form(team.slug)}
                onSuccess={() => onOpenChange(false)}
            >
                {({ errors, processing }) => (
                    <AntdForm layout="vertical" className="mt-4">
                        <AntdForm.Item
                            label="Email address"
                            validateStatus={errors.email ? 'error' : ''}
                            help={errors.email}
                            required
                        >
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                data-test="invite-email"
                                placeholder="colleague@example.com"
                                size="large"
                            />
                        </AntdForm.Item>

                        <AntdForm.Item
                            label="Role"
                            validateStatus={errors.role ? 'error' : ''}
                            help={errors.role}
                            required
                        >
                            <Select
                                value={inviteRole}
                                onChange={(value) =>
                                    setInviteRole(value as RoleOption['value'])
                                }
                                options={availableRoles.map((role) => ({
                                    label: role.label,
                                    value: role.value,
                                }))}
                                size="large"
                            />
                            <input type="hidden" name="role" value={inviteRole} />
                        </AntdForm.Item>

                        <div className="mt-8 flex justify-end gap-2">
                            <Button onClick={() => handleOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                data-test="invite-submit"
                                loading={processing}
                            >
                                Send invitation
                            </Button>
                        </div>
                    </AntdForm>
                )}
            </Form>
        </Modal>
    );
}
