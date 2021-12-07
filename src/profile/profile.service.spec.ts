import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { UserRepository } from 'src/user/entity/user.reposiory';
import { NewProfileResponseDto } from './dto/getProfile.response.dto';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './repository/profile.repository';

let service: ProfileService;
let userRepository: UserRepository;
let profileRepository: ProfileRepository;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProfileController,
      ProfileService,
      ProfileRepository,
      UserRepository,
    ],
  }).compile();

  service = module.get<ProfileService>(ProfileService);
  userRepository = module.get<UserRepository>(UserRepository);
  profileRepository = module.get<ProfileRepository>(ProfileRepository);
});

describe('ProfileService', () => {
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be getUserProfile method in ProfileService', () => {
    expect(service.getProfile).toBeDefined();
  });

  it('should be getUserProfile method in ProfileService', () => {
    expect(service.getProfile).toBeDefined();
  });

  it('should be addNewProfile method in ProfileService', () => {
    expect(service.addNewProfile).toBeDefined();
  });
});

describe('getUserProfile', () => {
  it('should be throw 404 HTTP Exception', async () => {
    const userId: number = faker.datatype.number();
    jest.spyOn(userRepository, 'findUser').mockReturnValue(null);
    jest.spyOn(service, 'getProfile');

    try {
      await service.getProfile(userId);
    } catch (err) {
      expect(err).toEqual(new NotFoundException());
    }
  });
});

describe('addNewProfile', () => {
  it('should be call save method of profileRepository', async () => {
    const mockProfileRepo = jest.spyOn(profileRepository, 'addNewProfile');
    jest.spyOn(service, 'addNewProfile');
    await service.addNewProfile(1, {});
    expect(mockProfileRepo).toHaveBeenCalledTimes(1);
  });
});
