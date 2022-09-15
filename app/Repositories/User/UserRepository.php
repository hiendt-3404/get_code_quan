<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\BaseRepository;
use App\Repositories\User\UserRepositoryInterface;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function getModel()
    {
        return User::class;
    }

    public function getUserList()
    {
        return $this->model->with('role')->orderByDesc('created_at')
            ->paginate(config('custom.per_page'));
    }

    public function getUser($id)
    {
        return $this->model->findOrFail($id);
    }

    public function getWrites()
    {
        return $this->model->isWriter()->get();
    }

    public function getUsers()
    {
        return $this->model->where('role_id', config('custom.user_roles.user'))->get();
    }

    public function createUser($option)
    {
        return $this->model->insert($option);
    }
}
