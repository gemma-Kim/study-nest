import * as faker from 'faker';
import { ProfileController } from '../application/profile.controller';
import { ProfileService } from '../application/profile.service';
import { ProfileRepository } from '../repository/profile.repository';
import { UserRepository } from 'src/module/user/repository/user.reposiory';
describe('ProfileController', () => {
  const userRepository = new UserRepository();
  const profileRepository = new ProfileRepository();
  // const controller = new ProfileController(service, profileRepository);

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ProfileController, ProfileService],
  //   }).compile();

  //   controller = module.get<ProfileController>(ProfileController);
  // });

  it('should be defined', () => {
    // expect(controller).toBeDefined();
  });
});

describe('getProfile', () => {
  let userRepository: UserRepository;
  let profileRepository: ProfileRepository;
  let service: ProfileService;
  let controller: ProfileController;
  let getUserProfileMockFn;
  const id: number = faker.datatype.number();
  const userId = faker.datatype.number();
  const invalidUserId = faker.datatype.string();
  const photo = faker.datatype.string();
  const gender: 'MAN' | 'WOMAN' = faker.random.arrayElement(['MAN', 'WOMAN']);

  beforeEach(() => {
    userRepository = new UserRepository();
    profileRepository = new ProfileRepository();
    // controller = new ProfileController(service, profileRepository);

    getUserProfileMockFn = jest.spyOn(controller, 'getProfile');
    // .mockImplementation((userId) => {
    //   return Promise.resolve({
    //     id,
    //     userId,
    //     photo,
    //     gender,
    //   });
    // });
  });

  it('getProfile method should be defined', () => {
    expect(controller.getProfile).toBeDefined();
  });

  it('getProfile method should be call with userId property', () => {
    getUserProfileMockFn(userId);
    expect(getUserProfileMockFn).toBeCalledWith(userId);
  });

  it('SUCCESS: getProfile', () => {
    const result = getUserProfileMockFn(userId);
    expect(result).resolves.toBe({
      id,
      userId,
      photo,
      gender,
    });
  });

  it('FAIL1: getProfile', async () => {
    const result = await getUserProfileMockFn(userId);
    console.log('result', result);
    expect(result).not.toEqual({
      id,
      userId,
      photo,
    });
  });
});
